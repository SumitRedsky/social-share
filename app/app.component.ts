import { Component } from "@angular/core";
// import { requestPermissions } from "nativescript-camera";
import { PhotosService } from "./core/photos.service";
import { requestPermissions } from "nativescript-permissions"

declare var android: any;

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {

    permissions = [];

    constructor(private photosService: PhotosService) {

        this.permissions.push(android.Manifest.permission.READ_CONTACTS);
        this.permissions.push(android.Manifest.permission.READ_EXTERNAL_STORAGE);
        this.permissions.push(android.Manifest.permission.WRITE_EXTERNAL_STORAGE);
        this.permissions.push(android.Manifest.permission.INTERNET);

        requestPermissions(this.permissions, "I need these permissions because I'm cool")
            .then(() => {
                console.log("Woo Hoo, I have the power!");
                this.photosService.getFromLocalStorage();
            })
            .catch(() => {
                console.log("Uh oh, no permissions - plan B time!");
            });
        // requestPermissions();
    }
}
