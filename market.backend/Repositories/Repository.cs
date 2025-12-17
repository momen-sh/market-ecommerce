using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using market.Data;
using market.Repositories.Interfaces;

namespace market.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly AppDbContext _db;
        protected readonly DbSet<T> _set;

        public Repository(AppDbContext db)
        {
            _db = db;
            _set = db.Set<T>();
        }

        public async Task<T?> GetByIdAsync(int id) => await _set.FindAsync(id);

        public async Task<List<T>> GetAllAsync() => await _set.ToListAsync();

        public async Task<List<T>> FindAsync(Expression<Func<T, bool>> predicate)
            => await _set.Where(predicate).ToListAsync();

        public async Task AddAsync(T entity) => await _set.AddAsync(entity);

        public void Update(T entity) => _set.Update(entity);

        public void Remove(T entity) => _set.Remove(entity);

        public Task SaveChangesAsync() => _db.SaveChangesAsync();
    }
}
