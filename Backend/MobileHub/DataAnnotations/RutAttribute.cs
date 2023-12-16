using System.ComponentModel.DataAnnotations;

namespace MobileHub.DataAnnotations
{
    public class RutAttribute : ValidationAttribute
    {
        public RutAttribute()
        {
        }

        public RutAttribute(string errorMessage) : base(errorMessage)
        {
        }

        public RutAttribute(Func<string> errorMessageAccessor) : base(errorMessageAccessor)
        {
        }

        public override bool IsValid(object? value)
        {
            if(value is not string rut) return false;
            var IsValidRut = new RegularExpressionAttribute(@"^\d{7,8}-[\dkK]$").IsValid(value);
            if (!IsValidRut) return false;
            
            return true;
        }
        

    }
}