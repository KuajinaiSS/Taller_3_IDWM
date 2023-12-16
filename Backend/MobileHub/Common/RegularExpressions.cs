using System.Text.RegularExpressions;

namespace MobileHub.Common
{
    public static partial class RegularExpressions
    {
        // Regex for validating a email
        [GeneratedRegex("^([a-zA-Z]+\\.)*ucn\\.cl$", RegexOptions.Compiled)]
        public static partial Regex UCNEmailDomainRegex();

        // Regex for validating a rut
        [GeneratedRegex(@"^\d{7,8}-[\dkK]$", RegexOptions.Compiled)]
        public static partial Regex RutRegex();




    }
}