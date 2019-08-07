var mymap = L.map('mapid').setView([48.75859825, 19.16799646], 10);
var drinkWatIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Pictograms-nps-drinking_water.svg/186px-Pictograms-nps-drinking_water.svg.png',
    iconSize: [20, 20], // size of the icon
    });
var hospitalIcon = L.icon({
    iconUrl: 'https://png.icons8.com/metro/1600/hospital.png',
    iconSize: [20, 20], // size of the icon
    });
var pubIcon = L.icon({
    iconUrl: 'https://cdn3.iconfinder.com/data/icons/snack-time/400/snack_time-17-512.png',
    iconSize: [20, 20], // size of the icon
    });
var parkingIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8AAADz8/P09PT+/v79/f319fUEBAT29vb8/Pz7+/v4+Pj6+vr39/f5+fmampp0dHSTk5NAQECNjY1ubm7i4uKlpaW5ubmsrKzCwsLY2NiCgoJJSUmLi4s9PT2goKDHx8cfHx96enozMzMuLi7g4OBmZmYlJSXQ0NBdXV3q6upUVFQREREgICApKSlpaWlPQtDfAAAXeUlEQVR4nNVdi1bbuhK1Ezv4lTgJpXlC4EAppLT9/787iTUzesuSkkDqde/B0JE125K8R5ptOUnYkWXaSWI7ubzteS/XHWXFfs3Kkk7Yv+QVneQ2W83EZJtYbNEkxDbETXY0NftzNpmwP+eTBuzqip1UdRlhO+m1xcslaEK2JdrGVY3X7Y66YH/OxgX7c16M2SWqYgL1F41mC7UUdaLaVmgLHuHlSrRt+OXAVqvaZKtVrbtZKbbdVesh+3M2GrJayuGIlWwGYygwgEsUQyg5HIIjgwIujrbjAXg0AtscbStuW8u2VHWOVVeGqiPc7PpsA7gPTveXHKi2g1Ei23KAgxCANtsabfWqh2rVuptd5y2h5/LbODgrwIw7PbICtN4MHeCIV213E6ou6gzb8ejIQANYKCVHHCB2UXI6ogULDlCputKq5veW2yYWgPzedpcD1hBbJbwFowAauqgO0NpF+92kqpWSHp37HxmDaAu19HfRM49BQxf1GIO6m9YxKAO0O31dY9DHTeXeQi2n0MRJY9DBmc4u6u1mfvyRjYNKQgsOwZFmWKMtOF0M8ek8Um3xcmO4nGjL/lANx3gzyLbEm+HhptJF8yY/BnmF9xhMKkCRj+Di1QjjpRGGX3CVZFQotg3a1iNwugDbDG3LEYZqowYvR7YJ/BP8iwfActwx/qT3+QtjsN4vbqfbp/Qrj6ft9Haxr11u8h5fdrc0K7ErOZ6/h1uzX0xfvhSbeLxMF/u80tzUHhUdEmB81/N3mCSP72IFNzf4Uz9JLScetiYT+3XfH/u6KD4LEaC1BSfN8iPW6UsB7H5+LDMHTcgAHWOwGS6fop2+HEB28nuJrGfoooUI0D4Gk8eHeKcvDfBwPKxtAAFSdwfyoZUmxhvV6Ss4ZOgb5xjsGD8vrF10/ScVrnU8XrZ/N7N2t2sP/2lb4aSd0Un3Uz85/F+wNZsYL0e27Wzzd/uiIn25K/UxCE1VNccJ4mRsA7hIJYAPm9UaRy+Q6KE09nTgYQoKkqZEWxgr+UQzqdDE33ayXm0epKZMF4mlBZtx2blmA7iTAG7WeVJjdOIzm7BPl06a0Q8P3pXr4+jBvpqm380AJ11glOHqmzYGbwng4X+73EQpnzmjV9phNBNv/8w86YGq5ZJGgLMmOdds4lwz+mHS3ApPiNkhMLct/lkAUhdN0+2ddGuuZ0Z/t6Wumu5K29wRflP7yYIDnFlKxqyqJWee0d9zN1dugBpN8JKPcsnPX1VzzOiLbMUH411i6qIZq0UtOUYeTG/WZwB4yVW1NQ3GFxPAru+WhRaq/UcAf1huYxzAAJrwWlU7Xu4HPW3uE83N5kiFeT1RSjaP1EWVFrwcTWgA/VfV+Ih6w/UGsu0Yv9JmksOHc45BV/LlLKtqJT0V56qb3coKMr4wH1wiD3o/Rb924Reo+9BXlzJAdFMpOWyeAODWF+BXJl+6m7GFp81vo5tyydEgWWIkIxP9lSZfuqrpabPsb8FDSVyymJ0O8NOSL7cQ2zwlvQCr5BEA3kix6LWOQWjtPUU2uGqLbmbMI7HkO/TpnR/ALwjVDDP6vIWh9apU3WVHKc3frajuMUTI/5nkyzGSKbHnDSQ3O61GXmO+oatlwZc//pHkCwvVNjDpX4hVjzvJCUptoOQUnkrrLw7VArpo5+YaWmYqujnqMk+5VEv9wp5KD/knzOhPCNW07lw+M8efm1p1E39jteBDaZNcaaimJl9o4RdnC3cjI0BKn2GMt6r/CZrgj4oxer7A5J4RYFbh6sw6ZFXtrKFaTBc92DZ3UjBtAzhspgzgyz8QqikP+/wP44v/ZFtZ13YI07cM4fYEgJcO1WySui3ji60EsGG6NuHWPLGm/ivXct1jEGxfGSH+FAHKurauJIQGGzfAa9DJaE/cDTC50A4jWdfWOQIx2yy50lBNpwlyE+cXdDPyYadDVXRtEBm0J3bR2FDNBtBDzpPjMv9YrVouCYvIu69IvoSHamI7TBDhCGMMI8AcrHb6TPLzky+eNAFuJi34npkBogAFrNrJFdGEPVSTHhUtLL6YAWI/GQPCWX4WgJ9DE1B1C09JqWpF13ZwBEKf1gLwOmb05pC5haek6Cbq2oTODXy4MwP8guSLcUYPVcsjqSU+5N0ZdG3i6E1Z6NOGAvyEUE3RyWh03SIf8o4m69rYbYS1gDYa4CWSLx5d9HAgW1A2uJJ0bViSM/7FZ/QnjUE94KqID9Wq5ZLE+Ncxo+8N1bibDfIhSmnMACtk/OyqacIUMhPjOwE2nPGvLfmSOMfgsWqJ8anq7uo0rZ4MJ8j4iQzw6mb0OkCJ8anqkunaBKdlxo/pooLaCwKjBHMkOSnDSO2FbyHGhmqCmwLjk5uga0Px+LGkxPgxABf3tzN23Oon6h9m7fLxbT3gSE95f4UzPrnJdG0ojWMlRcaPCdWSv2nw8fHyq31TAYaNQUDInjQWXRu0vcD4UWOw+ca8DtJsd8f7YpQVtudbbxdNOOPn3Ba1JWJJzvhxM/pyGgyQqyinb3jjvEM17mZDjD9W3OwOanti/LhQbZRMowEef7yvk7gumg8r5EM3QGSLtoyliWk0QHbyragCQjWhHRTGt0kvkfFnTWyoNj0NYEqKX3+aAFuJ8cnNjHlPJTFqmym1+Idq0xMB3jBtesRLciLjk5uyru1YEmphjB8Tqk1d3nu+pfAri3mPU2B8clPWtXUloZZdTwvaQ7VpejLANJ3XRfh7nJzxyc163GW5JX0G1NK6Adpn9Mm3tMd7D4CHZ+oobAwCwq6s4Gb3Zh9muaEk58O46ZKL8f0B3qT3cgt6LMAT4zfcTQx/xZLAh21s8iW3M34AwMPJmx9A7iZf81bcVEqC1S6JnS5ZGT8MYPoU1kUrFA2l6UR2UymJK8JtFZt8MTO+/bAibUO1EhIfKro2+q3gjB+7qmZk/PQPe3lpBi88HU9m9+9ymyqN/LTvlRLIVYt8qOnaqFUybMPEArB3Rm9kfFTv0ntODSu8prcJDBOOXVALAh8CQnITdG3CHA882vW2oG1Vzcj4DKG+JlNVxc78furBh+cwgB0fAuOTmzXTtVVCSail7QVoi1tNjM8U2JZVtcFfI0B4nAYkojnjk5vd7i2ka2MlU874zhm9DaCJ8dMOoX3hd4n9UkF6HyYlIMbn7SDp2qAkZ/y4VTUD46cdQseqWvZoBHjwNSTTToxfDxU35ZLE+JHJl0Rj/JQhdKWwk5X5afNj5A9wwhmflmRl4R78Bla7JC75MkHGV3yd5+7ky6upULos/QHyNe/SBTCjNe8mNvmiMH6KCJ0Aj5JIPeo5akW9AdYy41u6aD4soJZZyUtKtegCO2Vle2oCSHxoXdl+TzWAN+lDCECJ8clN1LXxhSS4e60dYE9uYmoAiIxvT74o7xxDP3iqAgCKjM/d1HVt4NHOBrA3+SIyPnd6bgMIVY/XBoDdOy3+ch7O+NzNWty9hTkNtbQSwJDky1RtDGJ8V/Kl2H8YAB44PyCNyRmf3JR0bbmka2vNLdifo8+/mQAeETqTL0n5YACYvlUBaUxifB5Riro2LMkZPy4BihJc5ck4702A/jIATBe1P0DStRU2XRv7jRg/UidDjC835Tyxj0G2qvZuAIjTCy/Vp6ZrG4gAuYSILh2bALUwftmXAH03zEkC0piFpmtDN+WSgq4tVk45NQEEZnPlB99Nc5LWF6BB14abbIm38biVGHg0y2SA/jn6qTE6mWsAldxEvk01gEoas2/xT9a1AUCmayuEknL3iNDJTA0AEaED4P6PAWBYGlNY8yY3S2n3lq4keCTr2kJ0MlND+AUIXduO/TABPO5Z4p+nFXRt1A6Sro2VFLtHjE6GZsDyg2NuuhlCbgJekFeXeBYhaUziQ24r6doqq64tSCdTqox/g4zvztFvTADTxyZASoBskSlbEcMjBZ3mjB+nk6mmJoAHhG6dTHZjApg+jv3ztD26NvoNXNsFhWriu/FTE8Aj49teUu5WthdGgCnk9b1SKLqubWwC2IBVm8dq1aYmgOm8cupksg8jwJu9P0A1y622oE3XFv7my9QEkBjfIkIwp8a7F3zcoZo4khy6NiEDoujaIt58mRoAEuNbdDL3RoDwkpZ3ntZL1zZRdW3hckrHmrepix7Gyv7dArBLIvqnMSVdGy6qS7q2riRcfAe3Jlwvas5ys1V9lCjhHqtJmYwebfKUtFNlBMh5DLq2iaRrYyVTzvhhLynjzsvmLPef5ffvu93ue3fAz93t9Ndvgy0BTPdBUgJifO6mtHsLlOSM7wzVrIpfe5bbftgAfgTJeYjxS+1RIZUkxo+UNDt0banlxGp770hE63St6drMAH10bc6XlL2z3P0A07exj5wHOxrp2lBpYgZYg1VbxUqaHQ+OQIAvWtXOxT8ly20BONZ1baFvvlh0beEA01kVoHYZZXKWmye2jv8RBCglXj2BksGvFZh1bREAb+6SIIBSlpsAVkzXJjjNLg6MH/Pmi5nxwwEy/V5IGlPIchPACdO1NUJJqKW1AewVmpuz3OEAQQjrAqjkiDjj870DQ3VtHm++WLLcwV0UVKYhUgJB14btEKpr83nzxZLlDgb42gtwoDwLBV2bmtiS2j7FNe/Il5Qzc5Y7FOBzZQboWHjga95GgAZdW+QLkirjRwF82fe1oB5Rkq6tkd1UAGIOuG1i3z4zZ7nDAD4MegEa6FpmfBtAYnyVbb1fkDRmucOeot9yVnXglhsS45ObLMvNb41N1+b/krIxyx0E0PYU7Vv8k3VtuKUQy3JT8sWmawt4Sdmc5fYH+GtvAejqol3VAuOTm7B7C3U7m64t5A1QgfEjAD7ByxYhNKHr2shN0LXlYtunnPHDx+DxMGe5PQG2QxtAj/VpQdeG7SB9lWyk7t4SEqrxFDZn/GCAz9/x8RcQqgnLhnz3FnVlBUradG1hLylbstz9AL895pV1PuiTI+KMryzJQklcyAQrrmsLfUnZnOV2H783qyIRNgpwjEH70pGqazN/do3r2iZ+M3oNoCXLnX7cGI6Ppz/b6W5VmFslVM4j69rMXVTXtYXvZWHKcqfpQ1YfjslgP6i7ozvp7h0Mvcj9DMSqJV0buskYf2zVtUVsFGDIctOqfjXErcOHovLaG6B9ZeV4XVHXJn2VLOFfJRsqWe6YvSz0LPfxRNa1hWx74y8lEHRtBFD6KhkrCQ+5VnQ6aC8LLcvdncyTIFF6lKSOMz65ybLcEGOTro2y3FEbqNp1bWffoZCqBtuZqmuDxW+rri1uh9h+XduJ295Y5+Ul17WpKytdSWz7FNe8I3eI7dW1XWxnJr6qn6GtCJA+xghWOy3v7rufjJnxH5rTuqiHnEfJcivfleMCFLAiXVvwfjJuXduJY9D0cgBVLTE+uZnJJTVdW/gOsU5dWwhNGEI1J0CJ8SkeAV2b8HgCj1qhZNIfqglOu3RtFxuDnZtClpu6aJ+uLWbbMYeu7ew0IVfN+ZDcrNhXyay6tpg9nRy6tnMBtM0JBF0biWeOV+G6tq6kwPhR245VVl2b/2sFcYozUdeG7QCXk0pyxo/bdsyqa7vsGExEXRvqu8yyL2L8yM387bq289CEGqoJG3Uru7dYAAq6tshtx8y6tofmMqGaeG9lxrcAnNCa9yR2h1i3ru2Sey1LjE9udkUFAQq2IerawneI9dK1XWSHQpHxyU39q2TgUSuUTIK2/nPp2i5EE1C1wPjyV8lI11YbdG3+NOGha4sK1TxUn1A1Z3y+KZSka2NOp3zNO2qHWIuubZ5cdgwCQvak4XsmKV8lU3VtUTvEWnRt87PP6HXNIPKhYIsaSLEkrXlH7hBr2b1lnhQXowm8t+ruLbIqim4NMX7sN1/MurZ5fuEueri+U9fGBShg1VaxO8SadW0PVQDAnnepTQDLHl0btaCgawumCZcoHRn/jDN6ueqjmz66toJ0bTADjtgh1rV7S9g3B0IFWWKWeyzp2uirZEenJcaP2SHWwfiXG4Nd1T66tkrOckdt5m/fveXSm0nbdW2lWFJg/Khdmh27t1wkVBPcJMbntqavkvEZcNxm/tbdWyJ3R+tNRPOFX+TDieqmXJIYP3Izf/vuLZcZg9xNnuVWpqJySWH3lqjN/GuLrm1eXiZUE9ohQ8avFEjyb1zXFruRuFnX9uCh2Y6hCfFRoeraTC2YjVRdW/hm/s7dW85PE4Kbiq4N3GS6NuGrZNiG/NbItfRuJE7rpdLxbAF4FpoAN0XGp0cF6NqEkuzeA8KYzfzNO5bvegFGhmqCmw5dWyncRuhcMxtA5xjs/kLvpeEJCsnPkHxRqpZH0owYn9ws5K+Sibq2jRFg8Gb+RqfPTRNY9Ub9Kllm/CrZE7sRf3u6qHkMni8B6j86+LroKxvyP/Gxou3ewkpu2Y3YnvDdpXCAJ9IEs83nDOF27JR94SZIL5NhxBi8dPJFD9U4wGHxwlyHLdAUgHyxg75Diuoln1Dt68dgPSjl75AqXZR/va6hb8l613IunYxH8sW5NrYCGlhJtspXyQ4l92C3UQGGd9GLrappALsZ/QZoYC8BhK+SCf2kfmGRwUNpAfjlNGFZeKieGcDnieim+lUylllhkcE6JFS7pE7GM08rfJdb2Pam07XhV8mg7RcQGWz+GZpgtvid1ZWynwExPvWTPc4HRsPz0MQ5ky/2paMKpu4fg0RzU3E6f8cJVGJx+qpCNVw2xEWa10QbSeqtqWA/I3wHzDWjv5Sc0jvYJlt8Bz19rM0Apc79kbLH6S2r5UI0cc4x2O2O0h1PpepmJtXCSi5xln53doBnnNFLtrg3aPq9UdzsGD8vZKczmF8cwm8tJXauUC0y+WIBWEDQnf6Et4rIzUrStVFJ2l/7Pvv8UC2ii1IfTZcKQPZVsrJR2374gCVWfbcxZDZxhuRLYniKJjnG0ulcfdhLXyUTbk3GuvWxq66T66AJR46oekOAnbeSm6KuTS6JUWya/viMGf0pY5AA8i+3qG4aS77QWudae/5eFU3kHOCz7KarBQ/HHbU8fkLrtFAtLvnSL0xOFgQwvVMAulrwYCiUvGUlr2hGTw+Z4p67uTK7mbFaDO9NfKenTbr9keSXD9U8ki8a0c85wKUCEC6n69qglpKl43Aw3u5z7TZ+2YyeYlH+CZeUktZYtahro6+SqTP6WUqi9OPnAqWSXx+q0bZQLoDyV8m0Gb2y1/1mXSbj5hSA56GJY0ev1ptUBKh2UdK1Hb3juja1llG5EgAejuf/FnddxTk+yVD1xz8CRF/IRRMP2wxNtFSH8OVdXBvMi7vV5jnl/Ys/ZKx7t6oAhdnE3YsAsDv+bF83t/yrTa33iZdJn+1s8zp/ke768cZbaMICUOW2+1RTj1zDIfiifIOuD2Chrqolb3O8pkknYz7xsDWZhNgivjnGolY2MwMURvokWf7+HKcjAP5canMCdQxm7M89q2rLJ7xlV9WCT99pwmvtorKuzZ58SVavN1cG8OPvIz56HV1U/iqZa1WtSgaL6XN6LcfzdDU4MKNBziMDHNeyrq1v0am5W8z+2/78Umw/t9PZan/sdD4rK4quza2TOTY57ow2xhN8iSrHPUMb3EqsHuGNA9sMbUvUYTcozxpz2wRs4XIV2k5GGHnhlMFr4UHIkQYlX/B18GyEb2rS+w3UT2hbCB6qgdPcFiWS+HEt3NwkH+JKGV6u5lWHL/5Byc9LgJ4yo3e5qY5BFeBVJV/sAHtHUj/AL19Vc8zoY6QEmq7tipMvekTpchOqztSvkl3zqpqri9rGYC7r2q47+RIzBo1fJbvW5Iv5BZ0+N026tn+HJqyhmubmZQCeN/kS1UVlgBhblTz8wnBCja0O4ZdmS6FahZeDLoq2FdpO0HZssE3AlkI1tepCr1p3U6malaxriJfGmO/AVbVmDOHXpM77bUs0gVrQtuS2eDluq1yu1Ksee1ed1Kqb7LcK94rCZbAc17hKPKkgfZw1qm3JbcGkgoykw5Yuh1VnHlVHuZnz/wonWZ5pJ4pJiK3JJAu4XIit5mb2P0+gN/sNW3r9AAAAAElFTkSuQmCC',
    iconSize: [20, 20], // size of the icon
    });
var fastFoodIcon = L.icon({
    iconUrl: 'https://static.thenounproject.com/png/10446-200.png',
    iconSize: [20, 20], // size of the icon
    });
var restaurantIcon = L.icon({
    iconUrl: 'data:image/png;base64,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',
    iconSize: [20, 20], // size of the icon
    });
var baseLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1Ijoicm90dGluZ2FwcGxlIiwiYSI6ImNqbTZiMnlkcTE0cHUzd3QzemZ0Z3o0aGsifQ.pxBojBbIn8_8nP44qQRH9Q'
}).addTo(mymap);


var amenityDict = {
		drinking_water : drinkWatIcon,
		hospital : hospitalIcon,
		pub : pubIcon,
		parking : parkingIcon,
		fast_food : fastFoodIcon,
		restaurant : restaurantIcon
}
var marker = null;

function onMapClick(e) {
	marker = L.marker(e.latlng).addTo(mymap);
}

function pickColor(crossing_area){
	if (crossing_area > 0.8)
		return "red";
	else if (crossing_area > 0.4)
		return "yellow";
	else if (crossing_area > 0.01)
		return "green";
	return "blue";
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

mymap.on('click', onMapClick);
var nearestBut = document.getElementById('nearest');
var amenityBut = document.getElementById('amenities');
var resetBut = document.getElementById('reset');
var distanceBut = document.getElementById('length');
var zonesBut = document.getElementById('zones');

resetBut.addEventListener('click', function(e){
	mymap.eachLayer(function(layer){
	//console.log(layer);
    if ( layer != baseLayer){
    	mymap.removeLayer(layer);
    }
});
});

nearestBut.addEventListener('click', function(e) {

	if (marker != null){
		console.log("aaaa");
		console.log(document.getElementById('nearest_number').value);
		//console.log(String(marker.getLatLng()['lat']) + String(marker.getLatLng()['lat']));
		var bodyy = {
			"min_distance": document.getElementById('nearest_distance').value,
			"number": document.getElementById('nearest_number').value,
			"marker_lat": marker.getLatLng()['lat'],
			"marker_lng": marker.getLatLng()['lng']
		};
		fetch('/clicked_nearest', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bodyy)
		})
		.then(function(res) {
			if(res.ok) {
				console.log('Click was recorded');
				return res.json();
			}
			throw new Error('Request failed.');
		})
		.then(function(res){
			console.log(res);
			for (var i in res.roads){
				//console.log(i);
				var road = res.roads[i].track;
				for (var ii in road.geometry.coordinates){
					var tmp = road.geometry.coordinates[ii][0]; 
					road.geometry.coordinates[ii][0] = road.geometry.coordinates[ii][1];
					road.geometry.coordinates[ii][1] = tmp;
				}
			}
			for (var i in res.roads){
				var finalColor = pickColor(res.roads[i].crossing_area);
				var polyline = L.polyline(res.roads[i].track.geometry.coordinates, {color: finalColor}).addTo(mymap);
			}
		})
		.catch(function(error) {
			console.log(error);
		});
	}
});

amenityBut.addEventListener('click', function(e) {
	console.log("aaaa");
	var choices = [];
	var checkBoxes = {
		1: "drinking_water",
		2: "hospital",
		3: "pub",
		4: "parking",
		5: "fast_food",
		6: "restaurant"
	};
	for(var i = 1; i <= 6; i ++){
		if (document.getElementById("inlineCheckbox"+String(i)).checked)
			choices.push(checkBoxes[i]);
	}
	if (choices.length == 0)
		return;
	console.log(document.getElementById('nearest_number').value);
	var bodyy = {
		"min_distance": document.getElementById('amenity_distance').value,
		"choices": choices

	};
	fetch('/nearest_amenities', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(bodyy)
	})
	.then(function(res) {
		if(res.ok) {
			console.log('Click was recorded');
			return res.json();
		}
		throw new Error('Request failed.');
	})
	.then(function(res){
		for (var i in res.roads){
				var road = res.roads[i].track;
				for (var ii in road.geometry.coordinates){
					var tmp = road.geometry.coordinates[ii][0]; 
					road.geometry.coordinates[ii][0] = road.geometry.coordinates[ii][1];
					road.geometry.coordinates[ii][1] = tmp;
				}
				var point = res.roads[i].point;
				var tmp = point.geometry.coordinates[0];
				point.geometry.coordinates[0] = point.geometry.coordinates[1];
				point.geometry.coordinates[1] = tmp;
			}
			for (var i in res.roads){
				var finalColor = pickColor(res.roads[i].crossing_area);
				var polyline = L.polyline(res.roads[i].track.geometry.coordinates, {color: finalColor}).addTo(mymap);
				var marker = L.marker(res.roads[i].point.geometry.coordinates, {icon: amenityDict[res.roads[i].type]}).addTo(mymap);
			}
		})
	.catch(function(error) {
		console.log(error);
	});
});

distanceBut.addEventListener('click', function(e) {

		//console.log("aaaa");
		//console.log(document.getElementById('length_tracks').value);
		var hours = document.getElementById('length_time_hours').value;
		var minutes = document.getElementById('length_time_mins').value;
		var speed = document.getElementById('length_speed').value;
		var min_length = ((speed * hours) + ((minutes/60) * speed)) * 1000;
		//console.log(min_length);
		//console.log(String(marker.getLatLng()['lat']) + String(marker.getLatLng()['lat']));
		var bodyy = {
			"min_length": min_length,
			"number": document.getElementById('length_tracks').value,
		};
		fetch('/clicked_length', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bodyy)
		})
		.then(function(res) {
			if(res.ok) {
				console.log('Click was recorded');
				return res.json();
			}
			throw new Error('Request failed.');
		})
		.then(function(res){
			console.log("DOstal som odpoved");
			console.log(res);
			for (var i in res.roads){
				var road = res.roads[i].track;
				for (var ii in road.geometry.coordinates){
					var tmp = road.geometry.coordinates[ii][0]; 
					road.geometry.coordinates[ii][0] = road.geometry.coordinates[ii][1];
					road.geometry.coordinates[ii][1] = tmp;
				}
			}
			for (var i in res.roads){
				var finalColor = pickColor(res.roads[i].crossing_area);
				var polyline = L.polyline(res.roads[i].track.geometry.coordinates, {color: finalColor}).addTo(mymap);
			}
		})
		.catch(function(error) {
			console.log(error);
		});
});

zonesBut.addEventListener('click', function(e) {

		//console.log("aaaa");
		//console.log(document.getElementById('length_tracks').value);
		//console.log(min_length);
		//console.log(String(marker.getLatLng()['lat']) + String(marker.getLatLng()['lat']));
		var bodyy = {
			"zones": "Zones"
		};
		fetch('/clicked_zones', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(function(res) {
			if(res.ok) {
				console.log('Click was recorded');
				return res.json();
			}
			throw new Error('Request failed.');
		})
		.then(function(res){
			console.log("DOstal som odpoved");
			console.log(res);
			var leafletzones = [];
			var parks = res.parks;
			for(var i in parks){
				//console.log(parks[i].park);
				//console.log(parks[i].park_name);
				parks[i].park.properties.park_name = parks[i].park_name;
				parks[i].park.properties.park_area = parks[i].park_area;
				leafletzones.push(parks[i].park);
			}
			console.log(leafletzones);
			L.geoJson(leafletzones).addTo(mymap);

			/*for (var i in res.roads){
				var road = res.roads[i].track;
				for (var ii in road.geometry.coordinates){
					var tmp = road.geometry.coordinates[ii][0]; 
					road.geometry.coordinates[ii][0] = road.geometry.coordinates[ii][1];
					road.geometry.coordinates[ii][1] = tmp;
				}
			}
			for (var i in res.roads){
				var finalColor = pickColor(res.roads[i].crossing_area);
				var polyline = L.polyline(res.roads[i].track.geometry.coordinates, {color: finalColor}).addTo(mymap);
			}*/
		})
		.catch(function(error) {
			console.log(error);
		});
});