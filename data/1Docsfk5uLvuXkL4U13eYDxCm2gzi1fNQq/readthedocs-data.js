var READTHEDOCS_DATA = {
    "project": "zeronet", 
    "theme": "readthedocs", 
    "version": "latest", 
    "source_suffix": ".md", 
    "api_host": "https://readthedocs.org", 
    "language": "en", 
    "commit": "997a866318757971bcc459ce4650473ca97fa208", 
    "docroot": "/home/docs/checkouts/readthedocs.org/user_builds/zeronet/checkouts/latest/docs", 
    "builder": "mkdocs", 
    "page": null
}

// Old variables
var doc_version = "latest";
var doc_slug = "zeronet";
var page_name = "None";
var html_theme = "readthedocs";

READTHEDOCS_DATA["page"] = mkdocs_page_input_path.substr(
    0, mkdocs_page_input_path.lastIndexOf(READTHEDOCS_DATA.source_suffix));
