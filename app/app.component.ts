import { Component } from '@angular/core';

export class Project {
  name: string;
  url: string;
  image: string;
}

@Component({
  selector: 'my-app',
  template: `
    <h2><a href="{{project.url}}">{{project.name}}</a></h2>
    <span>link to image source goes here</span>
    `
})

export class AppComponent {
  title = 'Projects';
  project: Project = {
    url: 'http://www.google.com',
    name: 'Local Host',
    image: 'link to image'
  };
}
