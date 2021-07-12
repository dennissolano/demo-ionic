import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    console.log(email);
    console.log(password);

    // const result = this.userService.performLogin(email, password);
    // if (result) {
    //   this.router.navigate(['/list']);
    // } else {
    //   console.log('Error al hacer login');
    // }

    // LoadingController => animacion de espera
    this.loadingController
      .create({
        message: 'Por favor espere...'
      })
      .then((res) => {
        res.present();

        this.userService
          .performLoginAsync(email, password)
          .then((userData) => {
            this.loadingController.dismiss();
            if (userData) {
              form.reset();
              console.log({userData});
              this.router.navigate(['/list']);
            } else {
              // toastController => mensajitos de abajo
              this.toastController
                .create({
                  header: 'Error',
                  message: 'Usuario incorrecto',
                  position: 'bottom',
                  duration: 3000
                })
                .then((toast) => {
                  toast.present();
                });
            }
          })
          .catch((error) => {
            this.loadingController.dismiss();
            this.toastController
              .create({
                header: 'Error',
                message: error,
                position: 'bottom',
                duration: 3000
              })
              .then((toast) => {
                toast.present();
              });
          });
      });
  }
}
