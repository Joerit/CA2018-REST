using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Domain
{
    public class Pokemon
    {
		public int Id { get; set; }
		public string Name { get; set; }
		public int Level { get; set; }
		public int Hp { get; set; }
		public PokemonRace Race { get; set; }
	}
}
