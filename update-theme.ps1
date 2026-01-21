$htmlFiles = @(
    "c:\Users\owner\Desktop\Freelanse\statek_web\article-detail.html",
    "c:\Users\owner\Desktop\Freelanse\statek_web\articles.html",
    "c:\Users\owner\Desktop\Freelanse\statek_web\cart.html",
    "c:\Users\owner\Desktop\Freelanse\statek_web\checkout.html",
    "c:\Users\owner\Desktop\Freelanse\statek_web\contact.html",
    "c:\Users\owner\Desktop\Freelanse\statek_web\faq.html",
    "c:\Users\owner\Desktop\Freelanse\statek_web\login.html",
    "c:\Users\owner\Desktop\Freelanse\statek_web\product-detail.html",
    "c:\Users\owner\Desktop\Freelanse\statek_web\register.html",
    "c:\Users\owner\Desktop\Freelanse\statek_web\shop.html",
    "c:\Users\owner\Desktop\Freelanse\statek_web\testimonials.html",
    "c:\Users\owner\Desktop\Freelanse\statek_web\admin\dashboard.html",
    "c:\Users\owner\Desktop\Freelanse\statek_web\admin\articles\index.html",
    "c:\Users\owner\Desktop\Freelanse\statek_web\admin\orders\index.html",
    "c:\Users\owner\Desktop\Freelanse\statek_web\admin\orders\show.html",
    "c:\Users\owner\Desktop\Freelanse\statek_web\admin\products\index.html"
)

foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Add theme CSS and JS to head if not already there
        if ($content -notmatch 'theme-light\.css') {
            $content = $content -replace '(<link rel="stylesheet" href="assets/app\.css">)', '$1' + "`n    <link rel=`"stylesheet`" href=`"assets/theme-light.css`">"
        }
        
        if ($content -notmatch 'theme\.js') {
            $content = $content -replace '(<script src="https://unpkg\.com/alpinejs")', '    <script src="assets/theme.js" defer></script>' + "`n    `$1"
        }
        
        # Add theme toggle button to nav if not already there
        if ($content -notmatch 'data-theme-toggle') {
            # Find the first occurrence of cart link in nav
            $cartLinkPattern = '<a href="cart\.html"[^>]*class="relative text-gray-300'
            $themeToggleButton = '        <button data-theme-toggle class="relative text-gray-300 hover:text-white transition" title="Toggle Theme">' + "`n                            <svg xmlns=`"http://www.w3.org/2000/svg`" fill=`"none`" viewBox=`"0 0 24 24`" stroke-width=`"1.5`" stroke=`"currentColor`" class=`"w-5 h-5`">`n                                <path stroke-linecap=`"round`" stroke-linejoin=`"round`" d=`"M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z`" />`n                            </svg>`n                        </button>`n                        <a href="cart.html"'
            
            if ($content -match $cartLinkPattern) {
                $content = $content -replace $cartLinkPattern, $themeToggleButton
            }
        }
        
        Set-Content $file -Value $content -Encoding UTF8
        Write-Host "Updated: $file"
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "All files updated successfully!"
