using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Domain
{
    public class PokeDBInitializer
    {
		public  static void Initialize(PokemonContext context) {
			//create if not exist
			context.Database.EnsureCreated();

			if (!context.Pokemon.Any()) {
								// add races
				PokemonRace bulbasaur = new PokemonRace() {
					Name = "Bulbasaur",
					Type = new List<string> { "grass" }
				};
				context.Races.Add(bulbasaur);

				PokemonRace squirtle = new PokemonRace() {
					Name = "Squirtle",
					Type = new List<string> { "water" }
				};
				context.Races.Add(squirtle);

				PokemonRace charmander = new PokemonRace() {
					Name = "Charmander",
					Type = new List<string> { "fire" }
				};
				context.Races.Add(charmander);

				PokemonRace pikachu = new PokemonRace() {
					Name = "Pikachu",
					Type = new List<string> { "electric" }
				};
				context.Races.Add(pikachu);

				PokemonRace ludicolo = new PokemonRace() {
					Name = "Ludicolo",
					Type = new List<string> { "water", "grass" }
				};
				context.Races.Add(ludicolo);

				// add individuals
				Pokemon larry = new Pokemon() {
					Name = "Larry",
					Race = ludicolo,
					Level = 23,
					Hp = 120
				};
				context.Pokemon.Add(larry);

				Pokemon ludo = new Pokemon() {
					Name = "Ludo",
					Race = ludicolo,
					Level = 45,
					Hp = 200
				};
				context.Pokemon.Add(ludo);

				Pokemon charles = new Pokemon() {
					Name = "Charles",
					Race = charmander,
					Level = 32,
					Hp = 95
				};
				context.Pokemon.Add(charles);

				Pokemon bert = new Pokemon() {
					Name = "Bert",
					Race = bulbasaur,
					Level = 5,
					Hp = 26
				};
				context.Pokemon.Add(bert);

				context.SaveChanges();
			}

		}

    }
}
