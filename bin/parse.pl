#!/usr/bin/env perl

use strict;
use warnings;

use Getopt::Long ();
use Pod::Usage   ();
use FindBin      ();
use File::Slurp  ();
use Try::Tiny;
use JSON::Tiny;

Getopt::Long::GetOptions(
    \my %opt,
    'help',
) or Pod::Usage::pod2usage( -exitval => 1 );

if ($opt{help}) {
    Pod::Usage::pod2usage( -exitval => 0 );
}

my $props_json_file  = "$FindBin::RealBin/../data/props.json";
my $brands_json_file = "$FindBin::RealBin/../data/brands.json";

unless ( -e $props_json_file && -r $props_json_file ) {
    print "open $props_json_file: doesn't exist or cannot be read\n";
    exit 1;
}

my $props_json = File::Slurp::read_file( $props_json_file )
    or die "read $props_json_file: " . $@ . "\n";
my $props_data = JSON::Tiny::decode_json $props_json;

my $brands_data = [];
foreach my $brand_category ( @{$props_data->{brandCategoryItems}{children}} ) {
    foreach my $brand ( @{$brand_category->{children}} ) {
        push @{$brands_data},
             {
                 name => $brand->{props}{label},
                 description => $brand->{props}{description},
                 url => $brand->{props}{link}{props}{url},
                 image => 'https:' . $brand->{props}{image}{props}{url},
             };
    }
}

my $brands_json = JSON::Tiny::encode_json $brands_data;

File::Slurp::write_file( $brands_json_file, { atomic => 1, binmode => ':raw' }, $brands_json )
    or die "write $brands_json_file: " . $@ . "\n";

__END__

=pod

=head1 NAME

parse.pl - load and extract the desired data from C<props.json>

=head1 SYNOPSIS

 parse.pl [--help]

=head1 DESCRIPTION

C<parse.pl> loads the C<props.json> file, then extracts the desired data and outputs a new json file.

=head1 OPTIONS

=over

=item --help

Print the help menu.

=back

=cut
