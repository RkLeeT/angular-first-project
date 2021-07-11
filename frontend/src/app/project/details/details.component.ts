import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public details = [];
  public httpDetails = [];
  public jsonData = [];

  public errorMsg: string;

  constructor(private _projectService: ProjectService) { }

  getDetails() {
    this.details = this._projectService.getDetails();
  }

  getDetailsTrack(index: number, detail: any): number {
    return detail.id;
  }

  ngOnInit() {
    
    // this._projectService.getHttpDetails()
    // .subscribe(data => console.log(data));

    this._projectService.getHttpDetails()
      .subscribe(data => this.httpDetails = data,
        error => this.errorMsg = error);

    this._projectService.getJsonData()
        .subscribe(data => this.jsonData = data,
          error => this.errorMsg = error);
  }

}
