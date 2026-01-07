**UPV/EHUko ikasleek garatutako web bertsioko futbol jokalarien asmakizun joko ezaguna**

## 📝 Deskribapena

Proiektu hau "Nor zara Ya?" jokoaren inplementazio bat da, non helburua futbol jokalari misteriotsu bat asmatzea den. Web Sistemen ikastaroko zeregin baten barruan garatu zen, batez ere front-end eta back-end teknologiak erabiliz.


Milestone 0: Arkitekturaren diseinua eta justifikazioa  (Hasieran)

2.1. Proiektuaren egitura

Gure aukera: B aukera - Egitura modularra (modernoa)

Arrazoia: proiektuaren eskalagarritasuna eta mantentze-lanak errazteko eta arazoak daudenean, errazago izango baita non dagoen aurkitzen, horrek buruhauste asko ekidinez


2.2. Zerbitzariaren sarrera-puntua

	Gure aukera: B aukera - server.js: app inportatuz zerbitzaria abiarazten duen fitxategi bakarra.
	Arrazioa: Gure ustez, aukera hau sinpleagoa da eta ulertzeko errezagoa.

2.3. Karpeta antolaketa

	Gure aukera: A aukera — motaren arabera: /routes, /controllers, /models moduko karpetak.
	Arrazioa: Lehenengo aukera aukeratu dugu ohituta gaudelako egitura mota hau erabiltzeko, gainera, gure ustez proiektua txukunagoa da motaren arabera sortzen baditugu karpetak, zeren eta fitxategiak beren funtzioaren arabera banatuta egoteak kodearen irakurgarritasuna hobetzen du

2.4. Konfigurazioaren kudeaketa

	Gure aukera: A aukera — .env erabiltzea: .env fitxategia proiektuaren hasieran (dotenv bidez) kargatzean
eta behar dugun edozein fitxategitan process.env erabiltzean datza.

	Arrazoia: Beste aukera baina garbiagoa eta sinpleagoa iruditzen zaigulako.


  2.5. Espezifikazioa: Sistemaren ibilbideak
admin.js

 Web | GET | /admin/ | Administrazio-panel nagusia | Autentifikazioa eta admin
 Web | GET | /admin/players/new | Jokalarien formulario berria | Autentifikazioa eta admin
 Web | GET | /admin/players/edit/:id | Jokalaria editatzeko formularioa | Autentifikazioa eta admin

users.js
 Web | GET | /users/ | Erabiltzailearen orri nagusia | Autentifikazioa
 Web | GET | /users/logout | Saioa ixtea | Autentifikazioa

teams.js
 API | GET | /teams/ | Talde guztiak lortzea | Publikoa
 API | GET | /teams/:id | Talde bat ID bidez lortzea | Publikoa

players.js
 API | GET | /players/ | Jokalarien zerrenda osoa lortzea | Publikoa
 API | GET | /players/:id | Jokalari bat ID bidez lortzea | Publikoa
 API | POST | /players/ | Jokalari berri bat sortzea | Autentifikazioa eta admin
 API | PUT | /players/:id | Jokalari bat eguneratzea | Autentifikazioa eta admin
 API | DELETE | /players/:id | Jokalari bat ezabatzea | Autentifikazioa eta admin

leagues.js
 API | GET | /leagues/ | Liga guztiak lortzea | Publikoa

solution.js
 API | GET | /solution/ | Soluzioen zerrenda lortzea | Publikoa
 API | GET | /solution/:gameNumber | Joko-zenbakiaren araberako soluzioa lortzea | Publikoa
