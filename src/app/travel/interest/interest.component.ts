import {Component, OnInit} from '@angular/core';
import {MasterService} from '../../services/master.service';
import {InterestModel} from '../../model/interest.model';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css']
})
export class InterestComponent implements OnInit {

  interests: InterestModel[];
  interest = new InterestModel();

  constructor(private masterService: MasterService) {
  }

  ngOnInit(): void {
    this.getAllInterests();
  }

  getAllInterests() {
    this.masterService.getAllInterests()
      .subscribe((result) => {
        this.interests = result;
      }, error => {

      });
  }

  saveInterest() {
    this.interest.status = 'ACTIVE';
    this.masterService.saveInterest(this.interest)
      .subscribe((result) => {
        this.interests.push(result);
        this.interest = new InterestModel();
      }, error => {

      });
  }

  cancel() {
    this.interest = new InterestModel();
  }
}
