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
			string filter = Request.Query["filter"];
			string value = Request.Query["val"];
			int pageSize;
			if(!Int32.TryParse(Request.Query["pagesize"], out pageSize)) {
				pageSize = -1;
			}
			int page;
			if (!Int32.TryParse(Request.Query["page"], out page)) {
				page = -1;
			}

			IQueryable<Pokemon> reply;

			switch (filter) {
				case "race":
					reply = ctx.Pokemon
						.Include(pkm => pkm.Race)
						.Where(pkm => pkm.Race.Name == value);
					break;
				case "type":
					reply = ctx.Pokemon
						.Include(pkm => pkm.Race)
						.Where(pkm => (pkm.Race.TypeA == value)||(pkm.Race.TypeB == value));
					break;
				default:
					reply = ctx.Pokemon
						.Include(pkm => pkm.Race);
					break;
			};
			switch (sort) {
				case "id":
					reply = reply.OrderBy(pkm => pkm.Id);
					break;
				case "name":
					reply = reply.OrderBy(pkm => pkm.Name);
					break;
				case "race":
					reply = reply.OrderBy(pkm => pkm.Race);
					break;
				case "type":
					reply = reply.OrderBy(pkm => pkm.Race.TypeA + pkm.Race.TypeB);
					break;
				case "hp":
					reply = reply.OrderBy(pkm => pkm.Hp);
					break;
				default:
					break;
			}

			List<Pokemon> replyList = reply
					.Include(pkm => pkm.Race)
					.ToList();

			if ((pageSize != -1) && (page != -1)) {
				// we need to do paging
				if (replyList.Count >= (page + 1) * pageSize) { // list is long enough to return full page
					return Json(replyList.GetRange(page * pageSize, pageSize));
				}
				else if (replyList.Count > page * pageSize) { // can only return partial page
					return Json(replyList.GetRange(page * pageSize, replyList.Count - (page * pageSize)));
				}
				else { // can't return anything
					return NotFound();
				}
			}
			else { // else we don't need to do paging
				return Json(replyList);
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
        public IActionResult Delete(int id)
        {
			Pokemon pokemon = ctx.Pokemon.Find(id);

			if (pokemon != null) {
				ctx.Pokemon.Remove(pokemon);
				return Ok();
			}
			else return NotFound();
		}
    }
}
