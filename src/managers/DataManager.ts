export class DataManager{

    private data = {
        country: 'Luxembourg',
        year_data: [
          {
            year: 2017,
            crimes: [
              {
                name: 'Offences against goods',
                n_crimes: 3584
              },
              {
                name: 'Burglaries',
                n_crimes: 785
              },
              {
                name: 'Drug cases',
                n_crimes: 125
              }
            ]
          },
          {
            year: 2018,
            crimes: [
              {
                name: 'Offences against goods',
                n_crimes: 3584
              },
              {
                name: 'Burglaries',
                n_crimes: 785
              },
              {
                name: 'Drug cases',
                n_crimes: 125
              }
            ]
          }
        ]
      }

    public getAvailableYears(country: string){
        let years: any[] = [];
        this.data.year_data.forEach(yearData => {
            years.push(yearData.year);
        })
        return years;
    }

    public getDataFromCountryAndYear(country: string, year: number){
        let crimes = null;
        this.data.year_data.forEach(yearData => {
        if(yearData.year == year){
            crimes = yearData.crimes;
        }
        })
        return crimes;
    }
}