import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {NavigationOptions} from '@ionic/angular/providers/nav-controller';
import {NoteService} from 'src/app/services/note.service';
import {Note} from 'src/app/types/models';
import {ListPage} from '../list/list.page';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss']
})
export class EditPage implements OnInit {
  note: Note;
  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private noteService: NoteService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.note = this.noteService.getNoteById(params.noteId);
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
