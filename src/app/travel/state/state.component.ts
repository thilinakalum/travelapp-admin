import {Component, OnInit} from '@angular/core';
import {MasterService} from '../../services/master.service';
import {StateModel} from '../../model/state.model';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  states: StateModel[];
  state = new StateModel();

  constructor(private masterService: MasterService) {
  }

  ngOnInit(): void {
    this.getAllStates();
  }

  getAllStates() {
    this.masterService.getAllStates()
      .subscribe((result) => {
        this.states = result;
      }, error => {

      });
  }

  saveState() {
    this.state.status = 'ACTIVE';
    this.masterService.saveState(this.state)
      .subscribe((result) => {
        this.states.push(result);
        this.state = new StateModel();
      }, error => {

      });
  }

  cancel() {
    this.state = new StateModel();
  }
}
