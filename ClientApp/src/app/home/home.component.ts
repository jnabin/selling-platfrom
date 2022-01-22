import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.prod';
import * as Aos from "aos";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  @ViewChild('modalClose')
  closeResult = '';
  photoIdentifier = '';
constructor(
    private titleService: Title, 
    private http: HttpClient, 
    private cd: ChangeDetectorRef,
    private modalService: NgbModal) { }

  open(content, identifier) {
    this.photoIdentifier = identifier;
    this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  validatePhotoIdentifier(identifier):boolean{
    if(this.photoIdentifier == identifier)
      return true;
    return false;
  }

  ngOnInit(): void {
    this.titleService.setTitle("Xatocode-Home");
  }

  ngAfterViewInit(): void {
    Aos.init({
      once: true,
    });
    //setTimeout(() => this.cd.detectChanges(), 3000);
  }

  post() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true

    };
    var body = {
      //"value":"two"
    };
    this.http.post(environment.BaseURI + "SessionTest", body, httpOptions).subscribe((res: any) => {
      ;
    }, err => {

    });

  }
  get() {
    this.http.get(environment.BaseURI + "SessionTest").subscribe((res: any) => {
      ;
    }, err => {

    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  /*divya write code*/
}
