//your code here
let pgNo = document.getElementById("pageNumber")
let pageNumber = 1;

// Buttons
let nextbtn = document.getElementById("load_next")
let prevbtn = document.getElementById("load_prev")

function fetchAPIData(pageNumber)
{
    fetch(`https://api.github.com/repositories/1296269/issues?page=${pageNumber}&per_page=5`)
    .then((response) => response.json())
    .then((data) =>
    {
        console.log("Data", data);

        let issues = document.createElement("ol")
        issues.className = "issues"
        for(let d of data)
        {
            console.log(d.id);
            let li = document.createElement("li")
            li.className = "item"
            li.innerHTML = d.id + " - " + d.url;
            issues.appendChild(li)
        }
        
        document.body.appendChild(issues)
    })
}

function loadPrev()
{
    if(pageNumber == 1)
    {
        prevbtn.disabled = true;
    }
    else
    {
        prevbtn.disabled = false;
        pageNumber--;
        let issues = document.querySelector(".issues")
        let items = document.getElementsByClassName("item")
        issues.remove(items)
        fetchAPIData(pageNumber)
        pgNo.innerHTML = pageNumber;
    }
}

function loadNext()
{
    pageNumber++;

    if(pageNumber == 2)
    {
        prevbtn.disabled = false;
    }
    let issues = document.querySelector(".issues")
    let items = document.getElementsByClassName("item")
    issues.remove(items);
    fetchAPIData(pageNumber)

    pgNo.innerHTML = pageNumber;
}

fetchAPIData(1);