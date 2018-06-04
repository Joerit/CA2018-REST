# CA2018-REST
repository for assignment of cloud apis '17-'18


by joeri temmerman

## Client

- uses https://pokemontcg.io/

- Resources: cards, types, sets

- Functionalities: paging, hypermedia(to get pages), filtering (filters on getCards), get cards by Id

- also contains client for local REST api

## API

- Controllers: 
	- PokemonController
		filtering by race and type
		sorting by id, name, race, type, hp
		paging
	- PokemonRaceController

- local MSSQLDB: PokemonDB
