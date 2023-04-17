import { Component, OnInit } from '@angular/core';
import { Pipeline } from 'src/app/pipeline';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchText=''

  constructor() { }

  ngOnInit(): void {
  }

  filterList:Pipeline[]=[]

  filterData() {
    return this.filterList.filter(item => {
       return item.firma_adi.toLowerCase().includes(this.searchText.toLowerCase()) ||
              item.durum.toLowerCase().includes(this.searchText.toLowerCase()) ||
              item.must_yet_kisi.toLowerCase().includes(this.searchText.toLowerCase()) ||
              item.proje_adi.toLowerCase().includes(this.searchText.toLowerCase())
    });
  }
  filteredData = this.filterData();

  onSearch() {
    this.filteredData = this.filterData();
 }
}
