# mkhousetable.awk - Given a list of houses, create an HTML table of them.
# Mark Riordan  2024-08-28
# awk -f mkhousetable.awk houses.txt >housetable.html
BEGIN {
    print "<table>"
}
{
    addr = $0
    print "<tr><td>" addr "</td><td></td><td></td></tr>"
} 
END {
    print "</table>"
}
