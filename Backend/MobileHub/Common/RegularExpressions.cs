using System.Text.RegularExpressions;

namespace MobileHub.Common
{
    public static partial class RegularExpressions
    {
        /**
        * Expression regular para validar un email de la UCN
        */
        [GeneratedRegex("^([a-zA-Z]+\\.)*ucn\\.cl$", RegexOptions.Compiled)]
        public static partial Regex UCNEmailDomainRegex();

        /**
        * Expression regular para validar el rut de un usuario
        */
        [GeneratedRegex(@"^\d{7,8}-[\dkK]$", RegexOptions.Compiled)]
        public static partial Regex RutRegex();




    }
}