import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero | undefined;

  // @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute, // Information about the route
    private heroService: HeroService, // Gets hero data from remote server
    private location: Location // Navigate back to the previous view
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get("id")!, 10);
    this.heroService.getHeroNo404(id).subscribe((hero) => (this.hero = hero));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
    }
  }
}
