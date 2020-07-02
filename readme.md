# Weather Report
Uma aplicação simples para exibição do clima local.

![Weather Report](https://media.discordapp.net/attachments/677597538286567445/728062346257498123/44581477-29de-42ee-9d10-6ecc1b86e22a.png?width=285&height=617)

## Como funciona?
A aplicação funciona com a junção da [Weather API](https://openweathermap.org/api) para fazer a leitura do tempo local baseado nas coordenadas entregues pela lib da react native community [react-native-geolocation](https://github.com/react-native-community/react-native-geolocation).

Ao iniciar o app é pedido a permissão de GPS do celular e com as coordenadas é feito uma requisição sobre as informações locais do clima.

## Como utilizar?

É bem simples, para utilizar o app você precisa realizar o seguitne:
 - Clonar o projeto.
  ```
  git clone https://github.com/IgorABezerra/Weather-Report.git
  ```
 - Após obter o projeto, rodar os seguintes comandos na pasta do projeto para realizar a configuração inicial
  ```
  # Baixar as dependências do projeto
  yarn
  ```

  ```
  # Utilizando um Simulador IOS, Cabo USB conectado ou Emulador Android, rodar um dos comandos
  yarn android -> para um Emulador Android
  yarn ios -> para um Simulador IOS
  ```

  ```
  # Começar a rodar o projeto
  yarn start
  ```

![Weather Report Jojo](https://vignette.wikia.nocookie.net/jjba/images/4/46/TAH.png/revision/latest/top-crop/width/360/height/450?cb=20170615152601&path-prefix=pt-br)

> Let's just go insane, how 'bout it? - **Weather Report**
