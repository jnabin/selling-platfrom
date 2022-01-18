import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-cancel',
  templateUrl: './payment-cancel.component.html',
  styleUrls: ['./payment-cancel.component.scss']
})
export class PaymentCancelComponent implements OnInit {
  timeLeft: number = 5;
  interval:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.startTimer();
  }
  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.router.navigateByUrl('/checkout')
      }
    },1000)
  }

  GoOrderPage(){
    this.router.navigateByUrl('/checkout')
  }

}
