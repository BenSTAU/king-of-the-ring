class pays {
  codeAlpha3 = "";
  codeAlpha2 = "";
  drapeau_link = "";
  nom = "";
  population = -1;
  superficie = -1;
  capitale = "";
  health = 100;
  health_maximum = 100;

  densite_population = -1;
  esperance_de_vie = -1;
  chomage = -1;
  dette_publique = -1;
  inflation = -1;
  esperance_de_vie_naissance = -1;
  mortalite_infantile = -1;
  medecin_pour_1000_habitants = -1;
  emissions_de_co2_par_habitants = -1;

  constructor(codeAlpha2, codeAlpha3, drapeau_link, nom, population, superficie, capitale) {
    this.codeAlpha2 = codeAlpha2;
    this.codeAlpha3 = codeAlpha3;
    this.drapeau_link = drapeau_link;
    this.nom = nom;
    this.population = population;
    this.superficie = superficie;
    this.capitale = String(capitale);
  }

  async start_game() {
    this.health = 100;

    if (this.densite_population == -1 || this.esperance_de_vie == -1 || this.chomage == -1 || this.dette_publique == -1 || this.inflation == -1 || this.esperance_de_vie_naissance == -1 || this.mortalite_infantile == -1 || this.medecin_pour_1000_habitants == -1 || this.consomation_energie_par_habitants == -1) {
      const baseUrl = "https://api.worldbank.org/v2/country";
      const indicators = {
        densite_population: "EN.POP.DNST",
        esperance_de_vie: "SP.DYN.LE00.IN",
        chomage: "SL.UEM.TOTL.ZS",
        dette_publique: "GC.DOD.TOTL.GD.ZS",
        esperance_de_vie_naissance: "SP.DYN.LE00.IN",
        inflation: "FP.CPI.TOTL.ZG",
        mortalite_infantile: "SP.DYN.IMRT.IN",
        medecin_pour_1000_habitants: "SH.MED.PHYS.ZS",
        consomation_energie_par_habitants: "EG.USE.PCAP.KG.OE",
      };

      for (const [key, indicator] of Object.entries(indicators)) {
        const url = `${baseUrl}/${this.codeAlpha2}/indicator/${indicator}?format=json&date=2010:2024`;

        const response = await fetch(url);

        if (!response.ok) {
          console.error(`Failed to fetch ${key} for ${this.nom}: HTTP ${response.status}`);
          continue;
        }

        const data = await response.json();

        const indicatorData = data[1];
        if (indicatorData && indicatorData.length > 0) {
          for (let i = 0; i < 14; i++) {
            const dataline = indicatorData.sort((a, b) => b.date - a.date)[i];

            if (dataline.value !== null) {
              this[key] = dataline.value;
            }
          }
        } else {
          console.warn(`No data available for ${key} in ${this.nom}`);
        }
      }
    }
  }

  to_string() {
    console.log(JSON.stringify(this, null, 2));
  }
}

async function generatePays() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

  let output = [];
  for (let i = 0; i < 250; i++) {
    const country = data[i];
    output.push(new pays(country.cca2, country.cca3, country.flags.svg, country.name.common, country.population, country.area));
  }

  return output;
}
export const paysList = await generatePays();
