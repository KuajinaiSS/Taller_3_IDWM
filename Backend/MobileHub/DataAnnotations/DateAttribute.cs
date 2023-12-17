using System.ComponentModel.DataAnnotations;

namespace MobileHub.DataAnnotations
{
    public class DateAttribute : ValidationAttribute
    {
        public DateAttribute()
        {
        }

        public DateAttribute(string errorMessage) : base(errorMessage)
        {
        }

        public DateAttribute(Func<string> errorMessageAccessor) : base(errorMessageAccessor)
        {
        }

        /**
         * Valida que el año sea mayor a 1900 y menor al año actual
         */
        public override bool IsValid(object? value)
        {
            if (value is not int year) return false;
            int currentYear = DateTime.Now.Year;
            return year >= 1900 && year <= currentYear;
            
        }
    }
}