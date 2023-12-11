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
            return false;
        }

    }
}