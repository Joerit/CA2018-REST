using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Domain
{
    public class PokemonRace
    {
		public int Id { get; set; }
		public string Name { get; set; }
		public ICollection<string> Type { get; set; }
	}
}
