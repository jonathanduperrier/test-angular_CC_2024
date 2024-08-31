/* Compossant affichant la liste des transactions */
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccessDbService } from '@app/services/access_db/access-db.service';
import { ENVIRONNEMENT } from '@environments/environment';
import { User } from '@app/models/user.model';
import { TransactDisplay } from '@app/models/transactsDisplay.model';
import { format, toZonedTime } from 'date-fns-tz';
import { fr } from 'date-fns/locale/fr';

@Component({
  selector: 'app-lst-transacts',
  templateUrl: './lst-transacts.component.html',
  styleUrls: ['./lst-transacts.component.scss']
})
export class LstTransactsComponent {
  private selectedData: Subscription;
  @Input() userId:string;
  public currency = ENVIRONNEMENT.currency;
  lstTransactsDebit:any;
  lstTransactsCredit:any;
  lstTransactsDisplay:TransactDisplay[] = [];

  filteredList: any[] = [];
  paginatedList: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchTerm: string = '';
  sortColumn: string = '';
  sortOrder: boolean = true; // true pour asc, false pour desc

  constructor(
    private accessDbService: AccessDbService,
  ){ }
  
  ngOnInit() {
    this.displayTransacts();
  }

  ngOnDestroy() {
    this.selectedData.unsubscribe();
  }

  private displayTransacts() {
    this.selectedData = this.accessDbService.getData().subscribe(data => {
      this.lstTransactsDebit = this.getTransactsDebit(this.userId, data.transactions);
      this.lstTransactsCredit = this.getTransactsCredit(this.userId, data.transactions);
      this.lstTransactsDebit.forEach(td => {
        let userDestination:User = data.users.find(i => i.id === td.toUserId);
        this.lstTransactsDisplay.push({"id":td.id, "type":"débit", "amount": -td.amount, "date": td.date, "first": userDestination.first, "last": userDestination.last});
      });
      this.lstTransactsCredit.forEach(td => {
        let userDestination:User = data.users.find(i => i.id === td.toUserId);
        this.lstTransactsDisplay.push({"id":td.id,"type":"crédit", "amount": td.amount, "date": td.date, "first": userDestination.first, "last": userDestination.last});
      });
      this.applyFilter(); // Cela va initialiser filteredList et paginatedList. On l'execute ici pour éviter les problemes lié aux asynchrone.
    });
  }

  private getTransactsDebit(user:string, transacts:any) {
    let lstTransactsDebit:User = transacts.filter(i => i.fromUserId === user);
    return lstTransactsDebit;
  }

  private getTransactsCredit(user:string, transacts:any) {
    let lstTransactsCredit:User = transacts.filter(i => i.toUserId === user);
    return lstTransactsCredit;
  }

  public convertToLocalTime(dateString: string): string {
    if(dateString.length === 23){
      dateString = (dateString.substring(0,19) + 'Z');
    }
    const date = new Date(dateString);
    const timeZone = ENVIRONNEMENT.timeZone;
    const zonedDate = toZonedTime(date, timeZone);
    const isoString = zonedDate.toISOString().replace(/\.\d{3}Z$/, 'Z'); // Assure un format valide
    return format(new Date(isoString), 'EEEE d MMMM yyyy à HH:mm', { timeZone, locale: fr });
  }

  /* Fonctions de gestion de la pagination */
  public applyFilter(): void {
    this.filteredList = this.lstTransactsDisplay.filter(item => {
      return item.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             item.first.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             item.last.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
    this.applySort();
  }

  private applySort(): void {
    if (this.sortColumn) {
      this.filteredList.sort((a, b) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];
        return (aValue > bValue ? 1 : -1) * (this.sortOrder ? 1 : -1);
      });
    }
    this.paginate();
  }

  private paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedList = this.filteredList.slice(startIndex, endIndex);
  }

  public sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortOrder = !this.sortOrder; // Inverser l'ordre si c'est la même colonne
    } else {
      this.sortColumn = column;
      this.sortOrder = true;
    }
    this.applySort();
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredList.length / this.itemsPerPage);
  }

}
