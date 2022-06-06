import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-afficheplayer',
  templateUrl: './afficheplayer.component.html',
  styleUrls: ['./afficheplayer.component.css']
})
export class AfficheplayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('videoEl', { static: true }) private videoElRef: ElementRef;
  @ViewChild('videoContainerEl', { static: true }) private videoContainerElRef: ElementRef;

  get video(): HTMLVideoElement {
    return this.videoElRef.nativeElement;
  }

  get videoContainer(): HTMLElement {
    return this.videoElRef.nativeElement;
  }

  onPlay() {
    this.video.play();
    
  }

  onPause() {
    this.video.pause();
  }

  onFullscreen() {
    if (this.videoContainer.requestFullscreen) {
      this.videoContainer.requestFullscreen();
    } else if ((this.video as any).mozRequestFullScreen) {
      (this.videoContainer as any).mozRequestFullScreen();
    } else if ((this.video as any).webkitRequestFullscreen) {
      (this.videoContainer as any).webkitRequestFullscreen();
    } else if ((this.video as any).msRequestFullscreen) {
      (this.videoContainer as any).msRequestFullscreen();
    }
  }

}
