# Pokedex

## Description

Learn more about Pokemon with the Pokedex!

Demo: <a href="https://readpato.github.io/pokedex/index.html">Pokedex</a>

### Technologies Used

For this project the technologies and tools used were:

- Vanilla JavaScript
- Bootstrap
- CSS
- SASS
- HTML
- NPM
- Cypress

#

## Installation

As this project runs with Bootstrap and Cypress you will have to have NPM or anything similar and then run this little code snippet on the CLI.

```
npm install
```

This will allow to download the dependencies you need to run the Pokedex properly.

#

## Utilization

The Pokedex is pretty simple to use. Once the main page is loaded, the user will have right at his disposition:

- A navigation bar that has the title and a search bar.
- A list of ten Pokemon with a summary about them.
- Two buttons that allow the cycling between the following and (if possible) the previous Pokemon.

<img  src="https://github.com/Readpato/pokedex/blob/gh-pages/src/images/readme-images/pokedex-homepage.PNG" align="center">

The navigation bar has two functionalities with its available elements:

- When the logo is clicked, it will allow the user to jump back to the homepage of the Pokedex.

- The search bar allows the user to search by name for a specified Pokemon and it will get in return a card showing a description from that Pokemon.

<img  src="https://github.com/Readpato/pokedex/blob/gh-pages/src/images/readme-images/pokedex-search.PNG" align="center">

The list that first appears in the homepage is the collection of the first ten Pokemon from the first generation.
If the user desires to circle through the entirety of the Pokemon generations, they can use the "Prev" and "Next" buttons. The former allows the user to circle backwards in the list and the latter allows to get newer Pokemon.

<img  src="https://github.com/Readpato/pokedex/blob/gh-pages/src/images/readme-images/pokedex-next-page.PNG" align="center">

Should the user insert in the input:

- An invalid character.
- A Pokemon name that exceeds 30 characters.
- A Pokemon name that doesn't exist.

A custom Pokemon card will appear displaying the silhouette of a Pokemon (Who's that Pokemon?) and a short description of the error that has occured.

<img src="https://github.com/Readpato/pokedex/blob/gh-pages/src/images/readme-images/pokedex-error.PNG" align="center">

#

## Challenges Faced

- Using a RESTful API to bring content to the page.

- Working with fetch API and asynchronous code.

- Conditional Testing with Cypress.

#

## What I learned

- How to correctly fetch a RESTful API content. I can see why the architecture of an API is really important. Once the resources that the API uses were clear for me, the fetching of its results was pretty straightforward.

- You can test almost everything with Cypress. It's amazing how it's also really intuitive to use. With this project I kept consolidating my knowledge of conditional testing aswell.

- As this project was mostly constructed with Bootstrap, I refreshed my knowledge about Flexbox, which in this case it's assigned by adding predefined Bootstrap classes to the HTML elements.

#

## Support

If some error should appear, you can contact me through:

- Twitter: @patoraedler
- Email: patoraedler@gmail.com

#

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate :)

#

## Author

Patrick Raedler.

#
