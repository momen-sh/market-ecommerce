using Microsoft.EntityFrameworkCore;
using market.Repositories.Interfaces;
using market.Services.Interfaces;
using market.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace market.Services
{
    public class AuthService : IAuthService
    {
        private readonly IRepository<User> _users;
        private readonly IConfiguration _config;

        public AuthService(IRepository<User> users, IConfiguration config)
        {
            _users = users;
            _config = config;
        }

        public async Task<object> RegisterAsync(RegisterDto dto)
        {
            var exists = (await _users.FindAsync(u => u.Email == dto.Email)).Any();
            if (exists) throw new InvalidOperationException("Email already exists");

            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Age = dto.Age,
                Gender = dto.Gender
            };

            await _users.AddAsync(user);
            await _users.SaveChangesAsync();

            return new { user.Id, user.FirstName, user.LastName, user.Email, user.Age, user.Gender };
        }

        public async Task<object> LoginAsync(LoginDto dto)
        {
            var user = (await _users.FindAsync(u => u.Email == dto.Email)).FirstOrDefault();
            if (user == null) throw new UnauthorizedAccessException("Invalid email or password");

            var ok = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
            if (!ok) throw new UnauthorizedAccessException("Invalid email or password");

            var token = CreateToken(user);
            return new { token, user = new { user.Id, user.FirstName, user.LastName, user.Email, user.Age, user.Gender } };
        }

        private string CreateToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(int.Parse(_config["Jwt:ExpiresMinutes"] ?? "60")),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
