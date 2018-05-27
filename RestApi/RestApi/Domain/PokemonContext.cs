using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Domain
{
    public class PokemonContext: DbContext
    {
		public PokemonContext(DbContextOptions<PokemonContext> options): base(options) {
		}

		public DbSet<Pokemon> Pokemon { get; set; }

		public DbSet<PokemonRace> Races { get; set; }

		public DbSet<PokemonType> Types { get; set; }
    }
}
