# DHBW Lörrach Webprogrammierung Chatanwendung

### How to run
#### Option 1: NPM
#### Vorraussetzung ist, dass npm bereits installiert wurde
Folgende Befehle müssen ausgeführt werden
1. `cd gitproject`
2. `cd server`
3. `npm install`
4. `npm start`
5. Eine zweite Konsole öffnen und `cd public`
6. `npm install`
7. `npm start`

Host und Port des Clients und des Servers sind hierbei in der .env Datei im public sowie server Ordner konfiguriert.

#### Option 2: Docker Compose
#### Vorraussetzung ist, dass docker und docker-compose bereits installiert wurden
1. `cd gitproject`
2. `docker-compose up -d`


Host und Port des Clients und des Servers sind hierbei in der docker-compose.yml konfiguriert und können jederzeit geändert werden.

Wenn alles funktioniert hat, sollte der Server in der Konsole auf den `Port 8123` hören und mit `MongoDB` verbunden sein. Außerdem sollte die Seite unter http://localhost:3000 erreichbar sein. Wenn nicht: Schlecht.

### Team:

- Moritz Demmer
- Maximilian Wiese
- Toni Lukenda
- Tim Kieninger


### Basisfunktionalitäten und unsere Umsetzung

- Aufgabe:

    - [x] Implementierung einer Client-Server Chat Anwendung (Vergleichbar mit slack)
    - [x] Der Client soll als Webanwendung ausgeführt werden.
    - [x] Die Backendtechnologie und Sprache ist frei wählbar.
    - [x] Es soll eine einfache Chat-Applikation implementiert werden in der es möglich sein soll mit mehreren Clients auf ein gemeinsames Backend zuzugreifen wobei die Eingaben der verschiedenen Teilnehmer auf den anderen Clients synchronisiert werden.
    - [x] Die eingesetzten Technologien zur Übertragung und Darstellung sollen dokumentiert und die Technologieentscheidungen erörtert werden (in der Präsentation).

- Client:

    - [x] Der Client soll über zwei Bereiche verfügen, einer Anzeige des Chats in der die eigenen und die Nachrichten der anderen verbundenen Teilnehmer angezeigt werden und einer Texteingabe mit der Nachrichten an alle Teilnehmer geschickt werden können.
    - [x] Jeder Client soll eindeutig über einen Namen identifizierbar sein

        - Angemeldete Nutzer/Kontakte werden links im Kontaktfenster angezeigt. In der Gruppe wird angezeigt, von wem die Nachricht abgeschickt wurde

- Backend:

    - [x] Das Backend soll die einzelnen Verbundenen Clients verwalten und die Nachrichten die von den einzelnen Clients gesendet werden an die anderen Verbundenen Clients verteilen.
    - [x] In der Basisaufgabe braucht es keine Persistenz oder Userverwaltung

  
### Welche Extras haben wir implementiert? 

- [x] Anzeige aller Verbundenen Clients/Nutzer
    - Der Online Status wird unter jedem Kontakt angezeigt
- [x] Persistenz des Chatverlaufes: Wenn sich ein neuer Client verbindet wird der bisherige Chatverlauf übertragen
    - Speicherung der Nachrichten, Nutzer, Gruppen wird in der MongoDB Cloud vorgenommen. Kann in der server/MongoDB.js angepasst werden. Bitte Hacken Sie mich nicht.
- [x] User können nicht nur plain text sondern auch HTML/Markdown/BBCode text übertragen
    - Durch die Verwendung von der Marked Lib möglich
- [x] User bekommen Avatare als Profilbilder zugewiesen
- [x] User können Emojis verwenden
   - Durch die Emoji Picker React Lib möglich
- [x] Registrierung + Login 
  - Gibt der Nutzer seinen Namen beim Login ein und dieser Name ist noch nicht registriert worden, so wird er automatisch zur Registrierung weitergeleitet, in welcher sein Name bereits eingetragen ist. Dort wird ihm ein zufällig generierter Avatar zugewiesen, den er mit einem Klick auf das Bild neu generieren lassen kann. Der Nutzername darf maximal 16 Zeichen enthalten, es muss eine valide Email und ein Passwort mit der Mindestlänge 6 eingegeben werden.
  Das Bild wird als String base64 encodiert. Passwort wird mit dem bcrypt Hashverfahren gehasht und die Informationen werden in der Datenbank abgespeichert.
- [x] Private Chaträume (1:1 Chats), sowie Gruppenchats
   - Privater Chat: Jeder Nutzer kann privat mit jedem Nutzer schreiben. Im Chat wird die Nachricht + die Uhrzeit, wann diese verfasst wurde, angezeigt. Falls dein Chatpartner mit dir gerade schreibt, wird das angezeigt.
   - Gruppenchat: Jeder Nutzer hat die Möglichkeit eigene Gruppen zu erstellen. Dafür muss er im Kontaktbereiche links, auf das Schreibsymbol neben dem Namen des Chats klicken, woraufhin sich ein Fenster öffnet. Außerdem kann jeder User jeder Gruppe beitreten. Dort kann er Nachrichten verfassen, sowie lesen. Es wird angezeigt, von wem die Nachricht kommt und wann diese abgeschickt wurde. Eigene Nachrichten werden rechts und die Nachrichten der anderen Gruppenmitglieder links angezeigt. Außerdem wird im Chatfenster angezeigt, wer gerade am schreiben ist.
- [x] Online gehostet
  - Seite auf http://webfuck.herokuapp.com gehostet und damit online von jedem überall zugreifbar.
    (Da die Dynos manchmal schlafen kann es beim 1. Aufrufen bis zu einer Minute brauchen, bis die Seite deployed wurde).
      
# Technologien
 ### Socket.io
Herzstück unseres Chats: Ermöglicht bidirektionale eventbasierte Echtzeit Kommunikation zwischen Clients und Server. Es baut auf dem Websocket Protokoll auf und bietet zusätzlich noch ein Fallback zu http long polling an.
Außerdem bietet es folgendes an:
  - automatisches Wiederverbinden
  - Räume
  - Subscription Service

## Backend Technologien

### Node.js

  Durch node.js lässt sich Javascript auch serverseitig ausführen. Außerdem ist es hochskalierbar  und verarbeitet Daten sehr schnell.

### Express
  
Ist ein schnelles Node.js Backend Framework, welches unter anderem ein Routing System anbietet. Es können API Endpunkte und Frameworks entwickelt werden.
 

### Cors
Hilfreich, wenn Client und Server nicht selben Ursprung haben. Da der Client auf `Port 3000` läuft, aber der Server auf `Port 8123`, müssen die Access-Control-Allow-Origin Headers ausgetrickst werden, damit Client und Server miteinander kommunizieren können bzw. der Server bestimmte Origins zulässt.



## Wichtige Frontend Libs

### Wieso React?
   - schneller Entwicklungsprozess
   - flexibel
   - Virtual Dom
   - weil es uns interessiert hat, mal in React zu programmieren ;)
   

### Marked
  - ist ein Low Level Markdown Compiler
  - implementiert alle Markdown Funktionen
  - gewartete Lib
  
### Emoji Picker React
  - zeigt wunderschöne Emojis an und wird ständig aktualisiert
  - bekannt

### Styled Components
  - CSS in JS 

### Axios
  - man kann http request von node.js ausführen
  - unterstützt auch die Promise API
  - automatische Umwandlung für JSON Data

    

### Datenbank Tabellen

| Tabelle  | Beschreibung                                                                                                                                                                                                     |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| users    | Hier werden alle Nutzerinformationen<br/> gespeichert: <br/> ID, username, password, profilePic                                                                                                                  |
| groups   | Hier werden alle Gruppen gespeichert:<br/>ID, name                                                                                                                                                               |
| messages | Hier werden alle Nachrichten (aus 1:1 Chats sowie Gruppenchats) gespeichert:<br/>id, message, users (die IDs der Nutzer, die beteiligt sind), sender(id des Absenders<br/>sowie sein Name), createdAt, updatedAt |

### Socket Events

| Events        | Description                                                                                                                                                         |
| ------------- |---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| typing  | schickt dem Empfänger (Gruppe oder privater Kontakt), dass jemand tippt und wer tippt                                                                               |
| join   | Lässt einen Socket einen Raum joinen. Falls es eine Gruppe ist, joint er der GruppenID,<br/>ansonsten wird eine spezielle Raum ID für die beiden Personen erstellt. |
| leave    | Lässt einen Socket alle Räume verlassen.                                                                                                                            |
| disconnect     | Entfernt den User aus der Online Liste.                                                                                                                             |
| send-msg  | Schickt eine Nachricht mit Absender Name, Absender ID und dem Erstelldatum an den<br/> jeweiligen Raum.                                                             |
### Screenshots
### Login
![Login](https://user-images.githubusercontent.com/80098065/207462353-2ae59a2f-d8d3-481a-9cc9-344cb1200d95.JPG)

### Registrierung
![Registrierung](https://user-images.githubusercontent.com/80098065/207463023-b2169460-7976-49ab-8a88-308afe709b46.JPG)

### Chatfenster (Gruppenchat)
![hauptfenster](https://user-images.githubusercontent.com/80098065/207463127-29c30385-d9bb-47b9-a7d0-d7506db5332c.JPG)

### Gruppe erstellen Funktion
![gruppe erstellen](https://user-images.githubusercontent.com/80098065/207463248-4a2264d6-e62a-49d3-a6fd-c6b48e5a5743.JPG)

### Emoji Picker
![emojis](https://user-images.githubusercontent.com/80098065/207463315-08726c9e-7d74-4666-8887-ab535c2d5fbf.JPG)

### Online Status der Kontakte
![online status](https://user-images.githubusercontent.com/80098065/207467108-977b5065-db80-4f78-bc1c-fbf33ac84277.JPG)



