import { Directive, ElementRef, Renderer2,Input } from '@angular/core';
import { AuthService } from '../auth.service';

@Directive({
  selector: '[appIsInvited]'
})
export class IsInvitedDirective {

  @Input('ownerId') owner : string
  public color : string

  constructor(private elem : ElementRef , private rend : Renderer2,private au: AuthService) {}

  ngOnInit() {
    if(this.owner == this.au.currentUser._id) {
      this.rend.setProperty(this.elem.nativeElement,'innerHTML','Owner');
      this.color = 'Blue'
    }
    else{
      this.rend.setProperty(this.elem.nativeElement,'innerHTML','Invited');
      this.color = 'Red'
    }
    this.rend.setStyle(this.elem.nativeElement, 'color', this.color);
  }

}
