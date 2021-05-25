import {Component, EventEmitter, Input, Output} from '@angular/core';

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  @Input() bgImage: string;
  @Input() radius: any;
  selectedImage: ImageSnippet;
  @Output() base64 = new EventEmitter<string>();

  constructor() {
    this.radius = '0%';
  }

  processImage(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedImage = new ImageSnippet(event.target.result, file);
      console.log(this.selectedImage.src);
    });
    reader.readAsDataURL(file);
    this.base64.emit(this.selectedImage.src);
  }
}
