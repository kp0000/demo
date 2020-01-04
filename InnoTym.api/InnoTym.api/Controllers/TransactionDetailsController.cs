using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InnoTym.api.Models;

namespace InnoTym.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionDetailsController : ControllerBase
    {
        private readonly InnoTymContext _context;

        public TransactionDetailsController(InnoTymContext context)
        {
            _context = context;
        }

        // GET: api/TransactionDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionDetail>>> GetTransactionDetail()
        {
            return await _context.TransactionDetail.ToListAsync();
        }

        // GET: api/TransactionDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDetail>> GetTransactionDetail(int id)
        {
            var transactionDetail = await _context.TransactionDetail.FindAsync(id);

            if (transactionDetail == null)
            {
                return NotFound();
            }

            return transactionDetail;
        }

        // GET: api/TransactionDetails/UserHistory

        /*[HttpGet]
    [Route("UserHistory")]
    public List<TransactionDetail> UserHistory(int id )                 //List <model name>
    {
        List<TransactionDetail> userObj = null;
        userObj = _context.TransactionDetail.Where(w => w.UserId== id).ToList();        //_context.tableName
        if (userObj == null)
        {
            return userObj;
        }
        return userObj;
    }*/

        [HttpGet]
        [Route("UserHistory")]
        public List<customTransaction> UserHistory(int id)
        {
            List<customTransaction> transactionList = new List<customTransaction>();
            customTransaction transactionObj = new customTransaction();
            List<TransactionDetail> list = _context.TransactionDetail.Where(w => w.UserId == id).Include("Ref").ToList();
            if (list == null)
            {
                return transactionList;
            }
            foreach (TransactionDetail item in list)
            {
                transactionObj = new customTransaction();
                transactionObj.TransactionId = item.TransactionId;
                transactionObj.UserId = item.UserId;
                transactionObj.RefId = item.RefId;
                transactionObj.TransactionAmount = item.TransactionAmount;
                transactionObj.InitialAmount = item.InitialAmount;
                transactionObj.Date = item.Date;
                transactionObj.TransactionType = item.TransactionType;
                transactionObj.RefUserName = item.Ref.Name;
                transactionList.Add(transactionObj);
            }
            return transactionList;

        }

        // PUT: api/TransactionDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransactionDetail(int id, TransactionDetail transactionDetail)
        {
            if (id != transactionDetail.TransactionId)
            {
                return BadRequest();
            }

            _context.Entry(transactionDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TransactionDetails
        [HttpPost]
        public async Task<ActionResult<TransactionDetail>> PostTransactionDetail(TransactionDetail transactionDetail)
        {
            _context.TransactionDetail.Add(transactionDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransactionDetail", new { id = transactionDetail.TransactionId }, transactionDetail);
        }

        // DELETE: api/TransactionDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TransactionDetail>> DeleteTransactionDetail(int id)
        {
            var transactionDetail = await _context.TransactionDetail.FindAsync(id);
            if (transactionDetail == null)
            {
                return NotFound();
            }

            _context.TransactionDetail.Remove(transactionDetail);
            await _context.SaveChangesAsync();

            return transactionDetail;
        }

        private bool TransactionDetailExists(int id)
        {
            return _context.TransactionDetail.Any(e => e.TransactionId == id);
        }
    }
}
