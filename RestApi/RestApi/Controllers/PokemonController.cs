using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestApi.Domain;

namespace RestApi.Controllers
{
    [Route("api/[controller]")]
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
						.Include(pkm => pkm.Race.Type)
						.OrderBy(pkm => pkm.Id)
						.ToList());
				case "name":
					return Json(ctx.Pokemon
						.Include(pkm => pkm.Race.Type)
						.OrderBy(pkm => pkm.Name)
						.ToList());
				case "race":
					return Json(ctx.Pokemon
						.Include(pkm => pkm.Race.Type)
						.OrderBy(pkm => pkm.Race)
						.ToList());
				case "type":
					return Json(ctx.Pokemon
						.Include(pkm => pkm.Race.Type)
						.OrderBy(pkm => pkm.Race.Type)
						.ToList());
				case "hp":
					return Json(ctx.Pokemon
						.Include(pkm => pkm.Race.Type)
						.OrderBy(pkm => pkm.Hp)
						.ToList());
				default:
					return Json(ctx.Pokemon
						.Include(pkm => pkm.Race.Type)
						.ToList());
			}
			
		}

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Json(ctx.Pokemon
				.Where(x => x.Id == id)
				.Include(pkm => pkm.Race.Type)
				.ToList());
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
