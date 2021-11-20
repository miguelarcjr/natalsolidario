import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }
  display: boolean = false;

  ngOnInit(): void {
  }

  nextAlbum() {
    this.router.navigate(['/album']);
  }

  showDialog() {
    this.display = true;
  }

  sendToWhatsapp() {
    window.open('https://api.whatsapp.com/send?phone=556984246678&text=Ol%C3%A1,%20eu%20gostaria%20de%20colaborar%20com%20o%20Natal%20Solid%C3%A1rio.', '_blank');
    this.display=false;
  }

}
