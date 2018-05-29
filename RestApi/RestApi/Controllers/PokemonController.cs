using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestApi.Domain;

namespace RestApi.Controllers
{
    [Route("api/Pokemon")]
	[EnableCors("AllowAll")]
	public class PokemonController : Controller
    {
		private readonly PokemonContext ctx;

		public PokemonController(PokemonContext ctx) {
			this.ctx = ctx;
		}

        [HttpGet]
        public IActionResult Get()
        {
			string sort = Request.Query["sort"];
			switch (sort) {
				case "id":
					return Json(ctx.Pokemon
						.Include(pkm => pkm.Race)
						.OrderBy(pkm => pkm.Id)
						.ToList());
				case "name":
					return Json(ctx.Pokemon
						.Include(pkm => pkm.Race)
						.OrderBy(pkm => pkm.Name)
						.ToList());
				case "race":
					return Json(ctx.Pokemon
						.Include(pkm => pkm.Race)
						.OrderBy(pkm => pkm.Race)
						.ToList());
				case "type":
					return Json(ctx.Pokemon
						.Include(pkm => pkm.Race)
						.OrderBy(pkm => pkm.Race.TypeA + pkm.Race.TypeB)
						.ToList());
				case "hp":
					return Json(ctx.Pokemon
						.Include(pkm => pkm.Race)
						.OrderBy(pkm => pkm.Hp)
						.ToList());
				default:
					return Json(ctx.Pokemon
						.Include(pkm => pkm.Race)
						.ToList());
			}
		}

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            List<Pokemon> reply = ctx.Pokemon
				.Where(x => x.Id == id)
				.Include(pkm => pkm.Race)
				.ToList();

			if (reply.Count > 0) return Json(reply);
			else return NotFound();
		}

        // POST api/values
        [HttpPost]
		public IActionResult Post([FromBody]Pokemon pokemon) {
			if (pokemon != null) {
				ctx.Pokemon.Add(pokemon);
				ctx.SaveChanges();
				return Created("", pokemon);
			}
			else return NotFound();
		}

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
