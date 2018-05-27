using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestApi.Domain;

namespace RestApi.Controllers
{
    [Produces("application/json")]
    [Route("api/PokemonRace")]
    public class PokemonRaceController : Controller
    {
		private readonly PokemonContext ctx;

		public PokemonRaceController(PokemonContext ctx) {
			this.ctx = ctx;
		}

		// GET: api/PokemonRace
		[HttpGet]
        public IActionResult Get()
        {
            return Json(ctx.Races.ToList());
        }

        // GET: api/PokemonRace/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
			List<PokemonRace> reply = ctx.Races
										.Where(race => race.Id == id)
										.ToList();
			if (reply.Count > 0) return Json(reply);
			else return NotFound();
		}
        
        // POST: api/PokemonRace
        [HttpPost]
        public IActionResult Post([FromBody]PokemonRace race)
        {
			if (race != null) {
				ctx.Races.Add(race);
				ctx.SaveChanges();
				return Created("", race);
			}
			else return NotFound();
		}
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
			PokemonRace race = ctx.Races.Find(id);

			if (race != null) {
				ctx.Races.Remove(race);
				return Ok();
			}
			else return NotFound();
		}
    }
}
