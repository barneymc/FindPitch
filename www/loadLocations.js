
//main function to load the content from the text file
function createContent(){
		
    var myDB = systemDB;
	
	$.getJSON("counties.json", function (e, f)

	if (f !== "success")
	{
		alert("Error while loading JSON: " + f)
	}
	else
	{
		myDB.database.transaction(function (h)
		{
			 var g = e.counties.length;
			$.each(e.counties, function (k, j)
			{
				alert('Hi');
			});
		})

	}
	
}
			
			
	
	MOSADB.SQLB =
{
    buildInsertSQL: function (b, c, a)
    {
        if (a.length === 0)
        {
            throw "buildInsertSQL : Error, try to insert an empty object in the table " + b
        }
        var d = "INSERT INTO " + b + " (";
        d += this._arrayToString(a, ",");
        d += ") VALUES (";
        d += this._getNbValString(a.length, "?", ",");
        d += ")";
        return d
    }, getMembersValue: function (d, a)
    {
        var c = [];
        for (var b = 0; b < a.length; b++)
        {
            c.push(d[a[b]])
        }
        return c
    }, getAttributesList: function (c, a)
    {
        var b = [];
        for (var d in c)
        {
            if (a && typeof this[d] === "function" && !c.hasOwnProperty(d))
            {
                continue
            }
            b.push(d)
        }
        return b
    }, _getNbValString: function (b, e, d)
    {
        var a = "";
        for (var c = 0; c < b; c++)
        {
            a += e;
            if (c < b - 1)
            {
                a += d
            }
        }
        return a
    }, _getMembersValueString: function (e, b, d)
    {
        var a = "";
        for (var c = 0; c < b.length; c++)
        {
            a += '"' + e[b[c]] + '"';
            if (c < b.length - 1)
            {
                a += d
            }
        }
        return a
    }, _arrayToString: function (d, c)
    {
        var a = "";
        for (var b = 0; b < d.length; b++)
        {
            a += d[b];
            if (b < d.length - 1)
            {
                a += c
            }
        }
        return a
    }
};

