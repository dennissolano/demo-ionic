import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Note} from 'src/app/types/models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss']
})
export class EditPage implements OnInit {
  note: Note;
  constructor(private route: ActivatedRoute, private navController: NavController) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.note = JSON.parse(params.note);
    });
  }

  cancelEditing() {
    this.navController.navigateBack('list');
  }

  updateData() {
    this.note.title = (document.getElementById('title') as HTMLInputElement).value;
    this.note.content = (document.getElementById('content') as HTMLTextAreaElement).value;
    this.navController.navigateBack('list');
  }
}
