import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { SearchDetailsPage } from '../search-details/search-details';
import { DetailPage } from '../detail/detail';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
})

export class SearchPage {
    searchQuery: string = '';
    items: string[];
    results = [
        {
            name: 'SONGS',
            songs: [
                {
                    name: 'Khói',
                    artist: 'DSK',
                    image: 'https://i1.sndcdn.com/artworks-000126544167-483bme-t500x500.jpg',
                    lyrics: 'Đứng trước mặt em anh bối rối'
                },
                {
                    name: 'Khói',
                    artist: 'Jak Nguyễn',
                    image: 'http://static.viva.vn//viva/images/thisinh/jaknguyen.jpg',
                    lyrics: 'Đêm dần trôi còn mình tôi với tôi '
                }
            ]
        },
        {
            name: 'ARTISTS',
            songs: [
                {
                    name: 'Khói',
                    image: 'http://i1.sndcdn.com/artworks-000137873905-wczvxh-t500x500.jpg',
                }
            ]
        }
    ];

    constructor(public navController: NavController,
            public toastController: ToastController,
            private ga: GoogleAnalytics) {
        this.navController = navController;
        this.toastController = toastController;
        this.ga = ga;
    }

    getItems(ev: any) {
        // Reset items back to all of the items

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter((item) => {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    back() {
        this.ga.trackEvent('Search', 'back', 'Back to Music Page');
        this.navController.pop();
    }

    more(category) {
        this.ga.trackEvent('Search', 'more', 'See more');
        this.navController.push(SearchDetailsPage);
    }

    showDetail() {
        this.ga.trackEvent('Search', 'back', 'Show detail');
        this.navController.push(DetailPage);
    }

    presentToast(e) {
        e.preventDefault();

        let target = e.target;
        if (target.tagName === 'BUTTON') {
            this.showDetail();
        } else {
            this.ga.trackEvent('Search', 'presentToast', 'Add song into playlist');

            let toast = this.toastController.create({
                message: 'Song was added successfully',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        }
    }
}
