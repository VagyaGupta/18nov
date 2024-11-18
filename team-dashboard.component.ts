import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
@Component({
  selector: 'ems-team-dashboard',
  templateUrl: './team-dashboard.component.html'
})
export class TeamDashboardComponent implements OnInit {
  email: any;

  constructor(
    private readonly breadCrumbService: BreadcrumbService,
  ) {
    this.breadCrumbService.set('@team-dashboard', 'Team Dashboard');
  }

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('authentication'))?.username;
  }

}
