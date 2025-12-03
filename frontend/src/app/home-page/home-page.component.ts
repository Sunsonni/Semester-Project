import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

export class HomePageComponent {
  hasAPIKey = false;
  ngOnInit() {
    const key = sessionStorage.getItem('has_api_key');
    this.hasAPIKey = key === 'true';
  }

}
