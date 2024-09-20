# InfoGeo

**InfoGeo** é um aplicativo mobile desenvolvido em **React Native** que exibe um mapa interativo. O usuário pode clicar em marcadores de países, estados ou cidades para visualizar informações detalhadas sobre esses locais, extraídas diretamente da **Wikipedia** e organizadas dinamicamente via API.

## Funcionalidades

- **Mapa Interativo**: Um mapa mundial que permite ao usuário interagir com diferentes regiões.
- **Informações dos Locais**: Ao clicar em países, estados ou cidades, o aplicativo exibe um popup com informações relevantes sobre o local.
- **API de GeoNames**: Os estados e cidades são obtidos dinamicamente via API GeoNames.
- **API da Wikipedia**: As informações detalhadas sobre o local são obtidas da Wikipedia em português.

## Tecnologias Utilizadas

- **React Native**: Framework principal para o desenvolvimento mobile.
- **React Native Maps**: Biblioteca para renderizar o mapa.
- **Axios**: Utilizado para realizar chamadas HTTP para as APIs.
- **REST Countries API**: Para obter os países e suas coordenadas.
- **GeoNames API**: Para buscar estados e cidades de cada país.
- **Wikipedia API**: Para obter informações em português sobre os locais.

## Requisitos

- **Node.js** instalado.
- **Expo CLI** instalado.
- Uma conta gratuita na **GeoNames** (para obter o `username`).
  
## Instalação e Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu_usuario/infogeo.git
   cd infogeo
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie uma conta no [GeoNames](https://www.geonames.org/) e substitua o `seu_usuario_geonames` no arquivo principal pelo seu nome de usuário.

4. Inicie o projeto:
   ```bash
   npx expo start
   ```

## Utilização

1. **Abra o mapa**: Ao iniciar o aplicativo, um mapa será exibido mostrando a região mundial.
   
2. **Clique nos marcadores**: Clicando em um marcador de um país, o aplicativo buscará os estados desse país e os exibirá no mapa. O mesmo ocorre com cidades ao clicar em estados.

3. **Ver informações**: Ao clicar em qualquer local, será exibido um popup com informações detalhadas do local, incluindo dados da Wikipedia.

## APIs Utilizadas

1. **REST Countries API**: Usada para obter todos os países e suas respectivas coordenadas geográficas.
   - Endpoint: `https://restcountries.com/v3.1/all`

2. **GeoNames API**: Usada para obter estados e cidades a partir do geoname ID do país ou estado.
   - Endpoint: `http://api.geonames.org/childrenJSON?geonameId={ID}&username={username}`

3. **Wikipedia API**: Usada para obter resumos em português dos países, estados e cidades.
   - Endpoint: `https://pt.wikipedia.org/api/rest_v1/page/summary/{nome}`

## Exemplo de Uso

1. O usuário abre o aplicativo e vê um mapa com marcadores representando os países.
2. Ao clicar no marcador de um país, o aplicativo mostra os estados desse país como novos marcadores.
3. O usuário pode clicar em um estado e ver suas cidades.
4. Informações detalhadas sobre o país, estado ou cidade clicado são mostradas em um modal.

## Personalização

- **Coordenadas**: É possível adicionar ou remover países, estados ou cidades ajustando o código de busca ou alterando as APIs.
- **Estilo**: O estilo do mapa e dos modais pode ser ajustado diretamente no arquivo `styles` do código.

## Contribuições

1. Faça um fork do repositório.
2. Crie um branch para suas alterações:
   ```bash
   git checkout -b minha-nova-feature
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m "Adicionei uma nova feature"
   ```
4. Faça o push do branch:
   ```bash
   git push origin minha-nova-feature
   ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

### Contato

Em caso de dúvidas, sugestões ou problemas, sinta-se à vontade para abrir uma issue ou entrar em contato.
