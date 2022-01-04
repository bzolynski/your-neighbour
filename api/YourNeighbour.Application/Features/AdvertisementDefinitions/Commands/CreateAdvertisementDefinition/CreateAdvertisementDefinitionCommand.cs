using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.AdvertisementDefinitions.Dtos;

namespace YourNeighbour.Application.Features.AdvertisementDefinitions.Commands.CreateAdvertisementDefinition
{
    public sealed record CreateAdvertisementDefinitionCommand(AdvertisementDefinitionCreateDto AdvertisementDefinition) : ICommand<AdvertisementDefinitionDto>;
}
