using System.ComponentModel.DataAnnotations;
using MobileHub.Common;

namespace MobileHub.DataAnnotations
{
    public class UCNEmailAttribute : ValidationAttribute
    {
        public UCNEmailAttribute()
        {
        }

        public UCNEmailAttribute(string errorMessage) : base(errorMessage)
        {
        }


        public UCNEmailAttribute(Func<string> errorMessageAccessor) : base(errorMessageAccessor)
        {
        }

        public override bool IsValid(object? value)
        {
            if(value is not string email) return false;
            var IsValidEmail = new EmailAddressAttribute().IsValid(value);
            if (!IsValidEmail) return false;

            try
            {
                var emailParts = email.Split('@')[1];
                return RegularExpressions.UCNEmailDomainRegex().IsMatch(emailParts);
            }
            catch (Exception)
            {
                return false;
            }

        }
    }
}