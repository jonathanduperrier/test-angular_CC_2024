import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lst-transacts',
  templateUrl: './lst-transacts.component.html',
  styleUrls: ['./lst-transacts.component.scss']
})
export class LstTransactsComponent {
  @Input() userId:string;

}
